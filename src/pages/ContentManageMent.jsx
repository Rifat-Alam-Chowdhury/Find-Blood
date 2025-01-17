import React, { useState, useRef, useMemo, useContext } from "react";
import JoditEditor from "jodit-react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import Blogcard from "../components/Blogcard";

function ContentManagement() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [Loading, setLoading] = useState(false);
  const axiosapi = useAxiosPublic();

  const { user } = useContext(AUthfirebase);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing your blog content...",
    }),
    []
  );

  //   roles
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "userprofile",
    queryFn: async () => {
      const data = await axiosapi.post("profilepage", {
        email: user?.email,
      });
      return data.data;
    },

    enabled: !!user?.email,
  });
  console.log(data);

  //all blogs
  const {
    data: AllBlogs = [],
    isLoading: AllBlogLoading,
    refetch: Allblogrefetch,
  } = useQuery({
    queryKey: "all blogs",
    queryFn: async () => {
      const allblogs = await axiosapi.post("allblog");
      return allblogs.data;
    },
  });
  console.log(AllBlogs);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFormData = new FormData();
      newFormData.append("image", file);
      setImgUpload(newFormData);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleBlogSubmit = async () => {
    if (!imgUpload) {
      console.error("No image selected.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API}`,
        imgUpload
      );

      const imgUrl = response.data.data.display_url;

      const info = {
        title,
        content,
        imageUrl: imgUrl,
        email: data?.email,
        PostedBy: data?.name,
        role: data?.role,
        status: data?.role === "admin" ? "Published" : "Draft",
      };

      const upload = await axiosapi.post("createblog", info);
      console.log(upload.data);
      setLoading(false);
      Allblogrefetch();
      setTitle("");
      setContent("");
      setImage(null);
      setImgUpload(null);
    } catch (error) {
      setLoading(false);
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className="p-6 border-2 w-11/12">
        <div className="flex justify-end mb-4">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              Loading ? "animate-pulse" : ""
            }`}
            onClick={handleBlogSubmit}
          >
            Add Blog
          </button>
        </div>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Blog Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title"
            className="block w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Cover Photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
            <div className="text-center">
              {image ? (
                <img
                  src={image}
                  alt="Cover"
                  className="max-w-full h-48 object-cover mb-4"
                />
              ) : (
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-300"
                />
              )}
              <div className="mt-4 flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 hover:text-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="blog-content"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Blog Content
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        {/* // publised blogs */}
        <Blogcard AllBlogs={AllBlogs} data={data} refetch={Allblogrefetch} />
      </div>
    </>
  );
}

export default ContentManagement;
