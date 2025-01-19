import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

function Blogcard({ AllBlogs = [], data = [], refetch }) {
  const axiosPublic = useAxiosPublic();
  console.log(AllBlogs);

  const HandleblogPostStatus = async (status, post) => {
    console.log(status, post);

    const res = await axiosPublic.post(`BlogStatusChange`, {
      status: status,
      _id: post,
    });
    if (res?.data?.acknowledged === true) {
      refetch();
    }
    return console.log(res.data.acknowledged);
  };

  return (
    <div className="border-2 flex gap-6">
      {AllBlogs?.map((blog) => (
        <div className="card bg-base-100  shadow-xl">
          <figure>
            <img src={blog?.imageUrl} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{blog.title}</h2>
            <h2 className="card-title">{blog.role}</h2>
            <div
              className="content-preview"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="card-actions justify-end">
              {blog.status !== "Published" ? (
                data?.role === "admin" ? (
                  <select
                    onChange={(e) => {
                      HandleblogPostStatus(e.target.value, blog?._id);
                    }}
                  >
                    <option disabled selected value="draft">
                      Draft
                    </option>
                    <option value="Published">Publish</option>
                    <option value="Reject">Reject</option>
                  </select>
                ) : (
                  <button disabled className="btn btn-secondary">
                    Wait for Admin to reviwe
                  </button>
                )
              ) : (
                <button className="btn btn-secondary">Already Published</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blogcard;
