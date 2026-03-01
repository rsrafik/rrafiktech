import { FullscreenMenu } from "./FullscreenMenu";
import { NotFoundPage } from "./NotFoundPage";

export function NotFoundLayout() {
  return (
    <>
      <FullscreenMenu isOnLightBg={false} activeSection="projects" />
      <NotFoundPage />
    </>
  );
}
