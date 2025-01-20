import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

function Blogcard({ AllBlogs = [], data = [], refetch, role }) {
  const axiosPublic = useAxiosPublic();

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
    <div className=" grid grid-cols-3 gap-3">
      {AllBlogs?.map((blog) => (
        <div className="card   shadow-xl mb-5 ">
          <figure className="h-64  w-full overflow-hidden  ">
            <img
              src={blog?.imageUrl}
              alt="Blog Illustration"
              className=" object-fill"
            />
          </figure>
          <div className="card-body ">
            <h2 className="flex justify-end">{blog.title}</h2>
            <h2 className="card-title">Posted By: {blog.role}</h2>
            <div
              className="content-preview"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="card-actions justify-end">
              {blog.status !== "Published" ? (
                data?.role === "admin" ? (
                  <select
                    className="p-1 rounded-lg"
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
                    Wait for Admin to review
                  </button>
                )
              ) : (
                <>
                  <button
                    disabled={role !== "admin"}
                    onClick={() => {
                      HandleblogPostStatus("Draft", blog?._id);
                    }}
                    className="btn-xs border-2 bg-green-300 rounded-xl"
                  >
                    Un Published
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blogcard;
