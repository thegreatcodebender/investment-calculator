import { createRoot } from "react-dom/client";
import { Button } from "./Button";
import { GenerateImageButtonProps } from "../types/generateImageButton";
import saveImageTemplate from "/assets/images/save_image_template.png";
import { currencyWithComma } from "../utils/display";
import { useState } from "react";
import ResultPieChart from "./ResultPieChart";
import { useCurrencyLocale } from "../context/CurrencyContext";
import { CurrencyLocales } from "../types/currencyContext";
import useIsMobileUserAgent from "../hooks/useIsMobileUserAgent";
import { domToPng } from "modern-screenshot";

const GenerateImageButtonV2 = ({
  pieData,
  investmentState,
  calculationResult,
  resultTitle,
  inflationAdjustedValue,
  isGoalSelected,
}: GenerateImageButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobileUserAgent = useIsMobileUserAgent();
  const [currencyLocale] = useCurrencyLocale();
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const inflation = investmentState.inflation;
  const { contribution, investmentAndInterestTotal } = calculationResult;
  const currency =
    currencyLocale === CurrencyLocales.IN ? (
      <span className="font-family-currency">₹</span>
    ) : (
      <span className="font-family-currency text-[0.9em]">$</span>
    );
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent); // Check if devices is iOS to find the compatibility of image share
  const supportsShare = !!navigator.share; // Check if native share is available
  const isBtnVisible = !(iOS && !supportsShare); // Hide button if navigator support not available in iOS (eg. in Firefox)
  // To show dynamic button text according to the screen size and share compatibility
  let buttonText = "Save as image";
  if (isMobileUserAgent && supportsShare) {
    if (isLoading) {
      buttonText = "Sharing...";
    } else {
      buttonText = "Share as image";
    }
  } else {
    if (isLoading) {
      buttonText = "Saving...";
    } else {
      buttonText = "Save as image";
    }
  }

  /**
   * Generate and download result image
   */
  const generateResultImage = async () => {
    // Validate pieData
    if (!pieData || pieData.length === 0) {
      console.error("No data provided for pie chart");
      return;
    }
    setIsLoading(true);

    try {
      // const html2canvasModule = await import("html2canvas");
      // const html2canvas = html2canvasModule.default;

      // Check if the pie data is large enough to overflow
      const isPieAmountLarge = pieData.some(
        (pie) => pie.valueCommaSeperated.length > 17
      );

      const today = new Date();
      const todayInWords = new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
      }).format(today);
      const fileNameSuffix = `${new Intl.DateTimeFormat(currencyLocale, {
        dateStyle: "short",
      }).format(today)}_${today.getTime()}`;

      // Create an offscreen container with explicit dimensions
      const offscreenDiv = document.createElement("div");
      offscreenDiv.style.position = "absolute";
      offscreenDiv.style.left = "0";
      offscreenDiv.style.top = "0";
      offscreenDiv.style.width = "1080px";
      offscreenDiv.style.height = "1920px";
      offscreenDiv.style.backgroundColor = "white";
      document.body.appendChild(offscreenDiv);
      // document.body.insertBefore(offscreenDiv, document.getElementById("root")); // For testing

      const root = createRoot(offscreenDiv);

      // Render result to offscreen container
      root.render(
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${saveImageTemplate})`,
            backgroundRepeat: "no-repeat",
            position: "relative",
            lineHeight: "1 !important",
          }}
        >
          <div className="absolute top-[212px] left-[52px]">
            <div className="flex gap-[144px] mb-[60px] ms-1.5">
              {/* Amount */}
              <div className="w-[350px]">
                <p className="text-[34px]">
                  {isGoalSelected ? "Goal" : "Investment Amount"}
                </p>
                <div className="text-[44px] font-semibold mt-2 leading-none">
                  {currency}
                  <span className="invisible text-[0.75em]">.</span>
                  {currencyWithComma({
                    amount: amount.actualValue,
                    currencyLocale,
                  })}
                </div>
              </div>
              {/* Expected Return Rate */}
              <div>
                <p className="text-[34px]">Expected Return Rate</p>
                <p className="text-[44px] font-semibold mt-2 leading-none">
                  {interest.actualValue}%
                </p>
              </div>
            </div>

            <div className="flex gap-[144px] ms-1.5">
              {/* Investment duration */}
              <div className="w-[350px]">
                <p className="text-[34px]">Duration</p>
                <p className="text-[44px] font-semibold mt-2 leading-none">
                  {duration.actualValue} years
                </p>
              </div>
              {/* Contribution type */}
              <div>
                <p className="text-[34px]">Contribution Type</p>
                <p className="text-[44px] font-semibold mt-2 leading-none">
                  {investmentNature.actualValue}
                </p>
              </div>
            </div>

            {/* Chart and legend */}
            <div className="relative mt-43">
              <div className="w-90 h-90">
                <ResultPieChart
                  pieData={pieData}
                  isAnimationActive={false}
                  outerRadius={130}
                  innerRadius={80}
                />
              </div>
              <div className="absolute left-[456px] top-[17px] h-90 w-125">
                {pieData.map((pie) => (
                  <div
                    key={pie.title}
                    className={`absolute top-14 last:top-auto last:bottom-15 not-last:mb-12 h-24 min-w-140`}
                  >
                    <div
                      className="absolute top-[-16px] w-10.5 h-10.5 rounded-[6px]"
                      style={{ backgroundColor: `${pie.fill}` }}
                    ></div>
                    <p
                      className="absolute top-[-14px] text-4xl ps-17.75 m-0 leading-none min-w-140"
                      style={{
                        marginBlockStart: 0,
                        fontSize: "36px",
                        lineHeight: "36px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pie.title}
                    </p>
                    <p
                      className={`absolute top-8 ps-17.75 leading-none ${
                        isPieAmountLarge ? "text-[42px]" : "text-5xl" // Reduce font size since the value causes overflow
                      } font-semibold`}
                    >
                      {currency}
                      <span className="invisible text-[0.75em]">.</span>
                      <span>{pie.valueCommaSeperated}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main result */}
            <div className="mt-29.5 ms-2.5 p-14">
              <div className="mb-18">
                <div className="font-semibold text-[44px] leading-none">
                  {resultTitle}
                </div>
                <p className="leading-[87px] text-[63px] font-semibold">
                  {currency}
                  <span className="invisible text-[0.75em]">.</span>
                  {contribution === -1
                    ? currencyWithComma({
                        amount: investmentAndInterestTotal,
                        currencyLocale,
                      })
                    : currencyWithComma({
                        amount: contribution,
                        currencyLocale,
                      })}
                </p>
              </div>
              <div>
                <p className="text-[34px] leading-none">
                  Inflation adjusted value {contribution !== -1 && "of goal"}
                </p>
                <p className="mt-2 leading-[47px] text-[34px] font-semibold">
                  {currency}
                  <span className="invisible text-[0.75em]">.</span>
                  {currencyWithComma({
                    amount: inflationAdjustedValue,
                    currencyLocale,
                  })}
                  <span className="font-normal text-[28px] ms-3 align-bottom">
                    at {inflation.actualValue.toFixed(2)}% annual inflation rate
                  </span>
                </p>
              </div>
            </div>

            {/* Investment completion projection */}
            <p className="mt-[42px] ms-17.5 text-[32px]">
              I will achieve my investment goal in{" "}
              <span className="font-semibold">
                {new Date().getFullYear() + duration.actualValue}
              </span>
            </p>
          </div>
          <div className="absolute bottom-36 right-[33px] opacity-78">
            Created {todayInWords}
          </div>
        </div>
      );

      // Use html2canvas to convert div to image
      setTimeout(() => {
        domToPng(offscreenDiv)
          .then(async (dataUrl) => {
            const fileName = `My_Investment_Plan_${fileNameSuffix}.png`;

            // Create download link
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = fileName;
            // link.style.display = "none";
            link.style.position = "absolute";
            link.style.left = "-9999px";
            document.body.appendChild(link);

            if (supportsShare && isMobileUserAgent) {
              const response = await fetch(dataUrl);
              const blob = await response.blob();
              const file = new File([blob], fileName, {
                type: "image/png",
              });

              try {
                await navigator.share({
                  files: [file],
                  title: `Found my investment plan! \n\nGet yours at iabhi.dev/icalc`,
                });
                // Clean up offscreen container
                root.unmount();
                document.body.removeChild(offscreenDiv);
              } catch (e) {
                console.error("Share as image failed:", e);
                // window.open(dataUrl, "_blank");
                link.click(); // Else trigger click
              }
            } else {
              link.click(); // Else trigger click
            }

            // Remove link after a delay
            setTimeout(() => {
              document.body.removeChild(link);
              // Clean up offscreen container
              root.unmount();
              offscreenDiv.remove();
            }, 1);
          })
          .catch((error) => {
            console.error("Error generating image:", error);
          });
      }, 300); // Increased timeout for rendering
    } catch (error) {
      console.error("Error while importing html2canvas", error);
      throw new Error(`Error while importing html2canvas. Error: ${error}`);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    isBtnVisible && (
      <Button
        btnType="primary"
        onClick={generateResultImage}
        isDisabled={isLoading}
        isFixedWidth
      >
        {buttonText}
      </Button>
    )
  );
};

export default GenerateImageButtonV2;
