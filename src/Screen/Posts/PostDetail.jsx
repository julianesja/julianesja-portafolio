import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../../components/Portafolio/MainLayout";
import PostsDataFallback from "../../Data/Posts.json";
import { getPosts } from "../../services/postService";

function PostDetailScreen() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPosts();
        const allPosts = data && data.length > 0 ? data : PostsDataFallback;
        const found = allPosts.find((p) => String(p.id) === id || p.slug === id);
        setPost(found || null);
      } catch (error) {
        console.warn("Error al cargar detalle de post:", error);
        const found = PostsDataFallback.find((p) => String(p.id) === id || p.slug === id);
        setPost(found || null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  return (
    <MainLayout>
      <div className="w-full max-w-3xl mx-auto py-12 px-6">
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          ← Volver a Posts
        </Link>

        {loading ? (
          <p className="text-neutral-500 dark:text-neutral-400 py-4">Cargando artículo...</p>
        ) : !post ? (
          <div className="py-12">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Post no encontrado
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              La publicación que estás buscando no existe o fue movida.
            </p>
          </div>
        ) : (
          <article className="prose dark:prose-invert max-w-none">
            <div className="flex flex-wrap items-center gap-x-3 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
              <span>{post.date}</span>
              {post.readTime && <span>• {post.readTime} de lectura</span>}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
              {post.title}
            </h1>

            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed whitespace-pre-line border-t border-neutral-200 dark:border-neutral-800 pt-8">
              {post.content || post.description}
            </div>
          </article>
        )}
      </div>
    </MainLayout>
  );
}

export default PostDetailScreen;
