import { useState, useEffect } from "react";
import { getContent, DEFAULT_CONTENT } from "../lib/contentService";

/**
 * useContent(section)
 * Fetches editable content from Firestore for the given section.
 * Falls back to DEFAULT_CONTENT while loading or on error.
 *
 * Usage:
 *   const { content, loading } = useContent("hero");
 *   <h1>{content.heading1}</h1>
 */
export function useContent(section) {
  const [content, setContent] = useState(DEFAULT_CONTENT[section] || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getContent(section).then((data) => {
      if (!cancelled) {
        setContent(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [section]);

  return { content, loading };
}