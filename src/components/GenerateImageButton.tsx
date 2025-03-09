import { PieChart, Pie } from "recharts";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import { Button } from "./Button";
import { GenerateImageButtonProps } from "../types/generateImageButton";
import saveImageTemplate from "../assets/images/save_image_template.png";
import { amountINRWithComma } from "../utils/display";

const GenerateImageButton = ({
  pieData,
  investmentState,
  calculationResult,
  resultTitle,
  inflationAdjustedValue,
  isGoalSelected,
}: GenerateImageButtonProps) => {
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const inflation = investmentState.inflation;
  const { contribution, investmentAndInterestTotal } = calculationResult;

  const generateResultImage = () => {
    // Validate pieData
    if (!pieData || pieData.length === 0) {
      console.error("No data provided for pie chart");
      return;
    }

    // Check if the pie data is large enough to overflow
    const isPieAmountLarge = pieData.some(
      (pie) => pie.valueCommaSeperated.length > 17
    );

    // Create an offscreen container with explicit dimensions
    const offscreenDiv = document.createElement("div");
    offscreenDiv.style.position = "absolute";
    offscreenDiv.style.left = "-9999px";
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
        <div className="absolute top-[196px] left-[52px]">
          <div className="flex gap-[144px] mb-[60px] ms-1.5">
            {/* Amount */}
            <div className="w-[350px]">
              <p className="text-[34px]">
                {isGoalSelected ? "Goal" : "Investment Amount"}
              </p>
              <div className="text-[44px] font-semibold mt-2 leading-none">
                <span className="font-family-currency">₹</span>
                <span className="invisible text-[0.75em]">.</span>
                {amountINRWithComma(amount.actualValue)}
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
            {/* Investment timeline */}
            <div className="w-[350px]">
              <p className="text-[34px]">Investment Timeline</p>
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
            <PieChart width={360} height={360}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="title"
                outerRadius="80%"
                innerRadius="50%"
                fill="var(--color-accent-green)"
                cx="50%"
                cy="50%"
                isAnimationActive={false}
              />
            </PieChart>
            <div className="absolute left-[456px] top-0 h-90 w-125">
              {pieData.map((pie) => (
                <div
                  key={pie.title}
                  className={`absolute top-14 last:top-auto last:bottom-15 not-last:mb-12 h-24 min-w-140`}
                >
                  <div
                    className="absolute w-10.5 h-10.5 rounded-[6px]"
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
                    <span className="font-family-currency">₹</span>
                    <span className="invisible text-[0.75em]">.</span>
                    <span>{pie.valueCommaSeperated}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Main result */}
          <div className="mt-27.5 ms-2.5 p-14">
            <div className="mb-18">
              <div className="font-semibold text-[44px] leading-none">
                {resultTitle}
              </div>
              <p className="leading-[87px] text-[63px] font-semibold">
                <span className="font-family-currency">₹</span>
                <span className="invisible text-[0.75em]">.</span>
                {contribution === -1
                  ? amountINRWithComma(investmentAndInterestTotal)
                  : amountINRWithComma(contribution)}
              </p>
            </div>
            <div>
              <p className="text-[34px] leading-none">
                Inflation adjusted value {contribution !== -1 && "of goal"}
              </p>
              <p className="mt-2 leading-[47px] text-[34px] font-semibold">
                <span className="font-family-currency">₹</span>
                <span className="invisible text-[0.75em]">.</span>
                {amountINRWithComma(inflationAdjustedValue)}
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
      </div>
    );

    // Use html2canvas to convert div to image
    setTimeout(() => {
      html2canvas(offscreenDiv, {
        backgroundColor: "white",
        scale: 1,
        logging: true, // Enable logging for debugging
      })
        .then((canvas) => {
          // Convert canvas to data URL
          const dataUrl = canvas.toDataURL("image/png");
          // Create download link
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "chart-image.png";
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up offscreen container
          root.unmount();
          document.body.removeChild(offscreenDiv);
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }, 300); // Increased timeout for rendering
  };

  return (
    <Button btnType="secondary" onClick={generateResultImage}>
      Download Image
    </Button>
  );
};

export default GenerateImageButton;
