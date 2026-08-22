import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Portafolio/MainLayout";
import PostsDataFallback from "../../Data/Posts.json";
import { getPosts } from "../../services/postService";

function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const data = await getPosts();
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(PostsDataFallback);
        }
      } catch (error) {
        console.warn("No se pudo cargar posts desde Firestore, usando respaldo:", error);
        setPosts(PostsDataFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  return (
    <MainLayout>
      <div className="w-full max-w-3xl mx-auto py-12 px-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 mb-10">
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-3">
            Posts & Bitácora Técnica
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Artículos, aprendizajes y guías sobre desarrollo de software, problemas resueltos y arquitectura.
          </p>
        </div>

        {loading ? (
          <p className="text-neutral-500 dark:text-neutral-400 py-4">Cargando publicaciones...</p>
        ) : posts.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400 py-4">
            Aún no hay publicaciones. Próximamente agregaré nuevas entradas.
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id || post.slug}
                className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
              >
                <div className="flex flex-wrap items-center gap-x-3 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  <span>{post.date}</span>
                  {post.readTime && <span>• {post.readTime} de lectura</span>}
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link to={`/posts/${post.id || post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed mb-4">
                  {post.description}
                </p>

                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
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

                <Link
                  to={`/posts/${post.id || post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Leer post completo →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default PostsScreen;
