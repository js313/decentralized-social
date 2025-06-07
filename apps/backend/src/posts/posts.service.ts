// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Like) private likeRepo: Repository<Like>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postRepo.find({ order: { timestamp: 'DESC' } });
  }

  createPost(wallet_address: string, content: string): Promise<Post> {
    const post = this.postRepo.create({ wallet_address, content });
    return this.postRepo.save(post);
  }

  async likePost(post_id: number, wallet_address: string) {
    const exists = await this.likeRepo.findOneBy({ post_id, wallet_address });
    if (!exists) {
      const like = this.likeRepo.create({ post_id, wallet_address });
      return this.likeRepo.save(like);
    }
    return { message: 'Already liked' };
  }

  async commentOnPost(
    post_id: number,
    wallet_address: string,
    content: string,
  ) {
    const comment = this.commentRepo.create({
      post_id,
      wallet_address,
      content,
    });
    return this.commentRepo.save(comment);
  }

  async getPostDetails(post_id: number) {
    const post = await this.postRepo.findOneBy({ id: post_id });
    if (!post) return null;

    const likes = await this.likeRepo.countBy({ post_id });
    const comments = await this.commentRepo.find({
      where: { post_id },
      order: { timestamp: 'ASC' },
    });

    return { post, likes, comments };
  }
}
