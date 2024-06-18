import { IPostDocument } from "@/DB/postModel";
import { Post } from "./Post";

export const PostFeed = ({ posts }: { posts: IPostDocument[] }) => {
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <Post post={post} key={post._id as string} />
      ))}
    </div>
  );
};
