import { FullscreenMenu } from "./FullscreenMenu";
import { PortfolioPage } from "./PortfolioPage";

export function PortfolioLayout() {
  return (
    <>
      <FullscreenMenu isOnLightBg={false} activeSection="portfolio" />
      <PortfolioPage />
    </>
  );
}
