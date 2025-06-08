import {
  Controller,
  Get,
  Post as HttpPost,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(): Promise<PostEntity[]> {
    return this.postsService.getAllPosts();
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  create(@Req() req, @Body() body: { content: string }) {
    const walletAddress = req.user.wallet_address;
    return this.postsService.createPost(walletAddress, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost(':id/like') // No need of POST but the task's PDF asked for a POST request
  like(@Req() req, @Param('id') id: string) {
    const walletAddress = req.user.wallet_address;
    return this.postsService.likePost(Number(id), walletAddress);
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost(':id/comment')
  comment(
    @Req() req,
    @Param('id') id: string,
    @Body() body: { content: string },
  ) {
    const walletAddress = req.user.wallet_address;
    return this.postsService.commentOnPost(
      Number(id),
      walletAddress,
      body.content,
    );
  }

  @Get(':id')
  getDetails(@Param('id') id: string) {
    return this.postsService.getPostDetails(Number(id));
  }
}
