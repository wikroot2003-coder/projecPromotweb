import HeroBanner from "../components/HeroBanner";
import SmartphoneDeals from "../components/SmartphoneDeals";
import TopCategories from "../components/TopCategories";
import ElectronicsBrands from "../components/ElectronicsBrands";
import DailyEssentials from "../components/DailyEssentials";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <SmartphoneDeals />
      <TopCategories />
      <ElectronicsBrands />
      <DailyEssentials />
    </>
  );
}
