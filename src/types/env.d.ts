/**
 * This is necessary to prevent IntelliSense from highlighting
 * the usages of import.meta.env in red due to the following issue,
 * which it looks like will be resolved in Vite v3.0.
 *
 * https://github.com/vitejs/vite/issues/6194
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv extends Readonly<Record<string, string>>{
  YEXT_PUBLIC_UNIVERSE : string;
  YEXT_PUBLIC_EXTERNAL_IMAGE_API_BASE_URL : string;
  YEXT_PUBLIC_GOOGLE_MAPS_API_KEY : string;
  YEXT_PUBLIC_BASE_URL:string;
  YEXT_PUBLIC_ROBOT_TAGS_STATUS:string;
}
