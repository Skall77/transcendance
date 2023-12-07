import { Injectable, Req, Res } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { FriendsDto } from './dto/friends.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async setOnline(@Req() req: Request) {
    const status = Status.ONLINE;
    await this.prisma.user.update({
      where: { accessToken: req.headers.authorization },
      data: { status },
    });
    return { message: 'User status is Online!' };
  }

  async setOffline(@Req() req: Request) {
    const status = Status.OFFLINE;
    await this.prisma.user.update({
      where: { accessToken: req.headers.authorization },
      data: { status },
    });
    return { message: 'User status is Offline!' };
  }

  async setPlaying(@Req() req: Request) {
    const status = Status.PLAYING;
    await this.prisma.user.update({
      where: { accessToken: req.headers.authorization },
      data: { status },
    });
    return { message: 'User status is Playing!' };
  }

  async getUsername(@Req() req: Request) {
    return this.prisma.user.findUnique({
      where: { accessToken: req.headers.authorization },
      select: { username: true },
    });
  }

  async setUsername(@Req() req: Request, @Res() res: any) {
    const { username } = req.body;
    if (!username || username.length < 3)
      return res
        .status(400)
        .json({ error: 'Username must be at least 3 characters long.' });
    return this.prisma.user.update({
      where: { accessToken: req.headers.authorization },
      data: { username: req.body.username },
    });
  }

  async getMyId(@Req() req: Request) {
    return this.prisma.user.findUnique({
      where: { accessToken: req.headers.authorization },
      select: { id: true },
    });
  }

  async getUserById(@Req() req: Request) {
    const { id } = req.params;
    return this.prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        username: true,
        avatarUrl: true,
        status: true,
        friends: true,
        blockedUser: true,
      },
    });
  }

  async getMyAvatar(@Req() req: Request) {
    return this.prisma.user.findUnique({
      where: { accessToken: req.headers.authorization },
      select: { avatarUrl: true },
    });
  }

  async setMyAvatar(@Req() req: Request) {
    await this.prisma.user.update({
      where: { accessToken: req.headers.authorization },
      data: {
        avatarUrl: `${process.env.BACKEND_URL}` + '/files/' + req.body.username,
      },
    });

    return { message: 'Avatar updated!' };
  }

  async addFriend(data: FriendsDto) {
    const { username, token } = data;
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
    const friend = await this.prisma.user.findUnique({
      where: { accessToken: token },
      select: { friends: true },
    });
    if (!user || !friend) return { error: 'User or friend not found.' };
    friend.friends.push(user.id);
    await this.prisma.user.update({
      where: { accessToken: token },
      data: {
        friends: { set: friend.friends },
      },
    });
    return { message: 'Friend added!' };
  }

  async removeFriend(data: FriendsDto) {
    const { username, token } = data;
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
    const friend = await this.prisma.user.findUnique({
      where: { accessToken: token },
      select: { friends: true },
    });
    if (!user || !friend) return { error: 'User or friend not found.' };
    const index = friend.friends.indexOf(user.id);
    if (index > -1) friend.friends.splice(index, 1);
    await this.prisma.user.update({
      where: { accessToken: token },
      data: {
        friends: { set: friend.friends },
      },
    });
    return { message: 'Friend removed!' };
  }

  async getFriendStatus(@Req() req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { accessToken: req.headers.authorization },
      select: { friends: true },
    });
    return {
      friends: user.friends.includes(parseInt(req.headers.id as string, 10)),
    };
  }

  async blockUser(data: FriendsDto) {
    const { username, token } = data;
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
    const block = await this.prisma.user.findUnique({
      where: { accessToken: token },
      select: { blockedUser: true },
    });
    if (!user || !block) return { error: 'User or friend not found.' };
    block.blockedUser.push(user.id);
    await this.prisma.user.update({
      where: { accessToken: token },
      data: {
        blockedUser: { set: block.blockedUser },
      },
    });
    return { message: 'User blocked!' };
  }

  async unblockUser(data: FriendsDto) {
    const { username, token } = data;
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
    const block = await this.prisma.user.findUnique({
      where: { accessToken: token },
      select: { blockedUser: true },
    });
    if (!user || !block) return { error: 'User or friend not found.' };
    const index = block.blockedUser.indexOf(user.id);
    if (index > -1) block.blockedUser.splice(index, 1);
    await this.prisma.user.update({
      where: { accessToken: token },
      data: {
        blockedUser: { set: block.blockedUser },
      },
    });
    return { message: 'User unblocked!' };
  }

  async getBlockedUserStatus(@Req() req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { accessToken: req.headers.authorization },
      select: { blockedUser: true },
    });
    return {
      blocked: user.blockedUser.includes(
        parseInt(req.headers.id as string, 10),
      ),
    };
  }

  async getFriendsList(@Req() req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { accessToken: req.headers.authorization },
      select: { friends: true },
    });
    return user.friends;
  }

  async getUserStatus(@Req() req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { accessToken: req.headers.authorization },
      select: { status: true },
    });
    return user.status;
  }
}
