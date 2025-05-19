import React from 'react';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  detailsLink?: string | null;
}

interface Props {
  params: {
    _id: string;
  };
}

async function fetchBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `https://tonmoy-portfolio-back-end.vercel.app/editor-content/${id}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch blog data');
    }

    const data = await res.json();
    if (!data || !data._id) return null;

    return data;
  } catch {
    return null;
  }
}

const BlogDetailsPage = async ({ params }: Props) => {
  const blog = await fetchBlog(params._id);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-center text-gray-500">
          No blog found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{blog.title}</h1>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto rounded-xl shadow-md mb-6"
        />
      )}

      <div
        className="prose prose-lg max-w-none text-gray-700 mb-6"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {blog.link && (
        <p className="mb-2">
          <strong>Link:</strong>{' '}
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {blog.link}
          </a>
        </p>
      )}

      {blog.detailsLink && (
        <p>
          <strong>Details Link:</strong>{' '}
          <a
            href={blog.detailsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {blog.detailsLink}
          </a>
        </p>
      )}
    </div>
  );
};

export default BlogDetailsPage;
