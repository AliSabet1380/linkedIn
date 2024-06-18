import { connectDB } from "@/DB/db";
import { Post } from "@/DB/postModel";
import { PostFeed } from "@/components/PostFeed";
import { PostForm } from "@/components/PostForm";
import { UserInfo } from "@/components/UserInfo";

const HomePage = async () => {
  await connectDB();
  const posts = await Post.getAllPosts();

  return (
    <div className="grid grid-cols-8 mt-3">
      <section className="hidden md:inline md:col-span-2 ml-14">
        <UserInfo />
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <PostForm />
        <hr className="w-full border-gray-300 mt-2 mb-2" />
        <PostFeed posts={posts} />
      </section>

      <section className="hidden xl:col-span-2 xl:inline justify-center">
        {/* Widget */}
      </section>
    </div>
  );
};

export default HomePage;
