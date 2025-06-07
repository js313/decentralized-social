// src/posts/posts.controller.ts
import { Controller, Get, Post as HttpPost, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(): Promise<PostEntity[]> {
    return this.postsService.getAllPosts();
  }

  @HttpPost()
  create(@Body() body: { wallet_address: string; content: string }) {
    return this.postsService.createPost(body.wallet_address, body.content);
  }

  @HttpPost(':id/like')
  like(@Param('id') id: string, @Body() body: { wallet_address: string }) {
    return this.postsService.likePost(Number(id), body.wallet_address);
  }

  @HttpPost(':id/comment')
  comment(
    @Param('id') id: string,
    @Body() body: { wallet_address: string; content: string },
  ) {
    return this.postsService.commentOnPost(
      Number(id),
      body.wallet_address,
      body.content,
    );
  }

  @Get(':id')
  getDetails(@Param('id') id: string) {
    return this.postsService.getPostDetails(Number(id));
  }
}
