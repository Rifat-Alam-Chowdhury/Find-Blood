import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Blogcard from "../components/Blogcard";
import BlogPublic from "../components/BlogPublic";

function Blog() {
  const axiosPublic = useAxiosPublic();

  const { data: AllBlogs = [], isLoading } = useQuery({
    queryKey: ["all blogs"],
    queryFn: async () => {
      const res = await axiosPublic("Blogs");
      return res.data;
    },
  });

  console.log(AllBlogs);

  return (
    <>
      <div className="py-12 ">
        <div className="max-w-6xl  mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Be a Hero</h2>
            <p className="text-gray-600 mt-2">
              Blood Donation News, Tips, and Stories
            </p>
          </div>
          <div className="grid  md:grid-cols-3 gap-2">
            {AllBlogs.map((blog, index) => (
              <BlogPublic key={index} {...blog} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
