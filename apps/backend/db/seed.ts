import { DataSource } from 'typeorm';
import { User } from '../src/users/user.entity';
import { Post } from '../src/posts/post.entity';
import { Like } from '../src/posts/like.entity';
import { Comment } from '../src/posts/comment.entity';
import dbConfig from './db-config';

const AppDataSource = new DataSource({
  ...dbConfig,
  synchronize: false,
  entities: [User, Post, Like, Comment],
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const postRepo = AppDataSource.getRepository(Post);
  const likeRepo = AppDataSource.getRepository(Like);
  const commentRepo = AppDataSource.getRepository(Comment);

  const users = await userRepo.save([
    {
      wallet_address: '0x1111111111111111111111111111111111111111',
      username: 'alice',
      bio: 'Decentralized dreamer',
      profile_pic_url: 'https://i.pravatar.cc/150?u=alice',
    },
    {
      wallet_address: '0x2222222222222222222222222222222222222222',
      username: 'bob',
      bio: 'Chain enthusiast',
      profile_pic_url: 'https://i.pravatar.cc/150?u=bob',
    },
  ]);

  const posts = await postRepo.save([
    {
      wallet_address: users[0].wallet_address,
      content: 'Hello world from Web3!',
      timestamp: new Date(),
    },
    {
      wallet_address: users[1].wallet_address,
      content: 'Loving the decentralized vibes!',
      timestamp: new Date(),
    },
  ]);

  await likeRepo.save({
    post_id: posts[0].id,
    wallet_address: users[1].wallet_address,
  });

  await commentRepo.save({
    post_id: posts[0].id,
    wallet_address: users[1].wallet_address,
    content: 'Great post!',
    timestamp: new Date(),
  });

  console.log('🌱 Seeding complete!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
