import { createPost, getAllPosts, getTopPosts } from '../src/service/post.service';
import { createPostQuery, getAllPostsQuery, topPosts } from '../src/database/post.model';

jest.mock('../src/database/index', () => {
  return {
    one: jest.fn(),
    any: jest.fn()
  };
});

import * as db from '../src/database/index';

describe('Post Service', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if title or user_id is missing in createPost', async () => {
    await expect(createPost({ title: '', user_id: '1' })).rejects.toThrow('Title and user_id are required');
  });

  it('should create a post successfully', async () => {
    ((db as any).one as jest.Mock).mockResolvedValue({ id: '1', title: 'title', user_id: '1' });
    const post = await createPost({ title: 'title', user_id: '1' });
    expect(post).toEqual({ id: '1', title: 'title', user_id: '1' });
    expect((db as any).one).toHaveBeenCalledWith(createPostQuery, ['title', '1']);
  });

  it('should fetch all posts', async () => {
    ((db as any).any as jest.Mock).mockResolvedValue([{ id: '1', title: 'title', user_id: '1' }]);
    const posts = await getAllPosts();
    expect(posts).toEqual([{ id: '1', title: 'title', user_id: '1' }]);
    expect((db as any).any).toHaveBeenCalledWith(getAllPostsQuery);
  });

  it('should fetch top posts', async () => {
    ((db as any).any as jest.Mock).mockResolvedValue([{ id: '1', title: 'title', user_id: '1' }]);
    const top_posts = await getTopPosts();
    expect(top_posts).toEqual([{ id: '1', title: 'title', user_id: '1' }]);
    expect((db as any).any).toHaveBeenCalledWith(topPosts);
  });
  
  it('should propagate the error if any database operation fails', async () => {
    ((db as any).one as jest.Mock).mockRejectedValue(new Error('Database error'));
    await expect(createPost({ title: 'title', user_id: '1' })).rejects.toThrow('Database error');
  });
});
