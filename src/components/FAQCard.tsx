import { useCurrencyLocale } from "../context/CurrencyContext";
import { CurrencyLocales } from "../types/currencyContext";
import Accordion from "./Accordion";
import Card from "./Card";
import { CurrencyIcon } from "./Icons";
import { TBODY, TD, TH, THEAD, TR } from "./Table";
import calculationsImage from "/assets/images/calculations.svg";
import calculationsImagePNG from "/assets/images/calculations.png";

const FAQCard = () => {
  const [currencyLocale] = useCurrencyLocale();
  const isINR = currencyLocale === CurrencyLocales.IN;
  const currency = isINR ? "INR" : "USD";
  return (
    <Card className="max-lg:mt-8 min-w-[300px] mt-6">
      <h3 className="mb-0.5 text-lg font-semibold leading-snug">FAQs</h3>
      <div className="mt-3">
        {/* Accordion 1 */}
        <Accordion
          title="What does 'Inflation-Adjusted' mean?"
          content={
            <>
              <p className="mb-2">
                This value tells you what your future investment is truly worth
                in today's purchasing power.
              </p>
              <p className="font-semibold mb-1">Example: </p>
              <p className="flex flex-wrap">
                Invest {currency} {isINR ? "10L" : "100K"} today at 6% return
                for 10 years, and inflation rate is 5.7%. After 10 years:
              </p>
              <div className="overflow-x-auto no-scrollbar">
                <table className="mt-3 mx-auto border-collapse max-sm:leading-none">
                  <THEAD>
                    <TR>
                      <TH haveBorder={false}>
                        <span className="sr-only">Value type</span>
                      </TH>
                      <TH>
                        <span className="max-sm:text-xs">
                          Without investment
                        </span>
                      </TH>
                      <TH>
                        <span className="max-sm:text-xs">With investment</span>
                      </TH>
                    </TR>
                  </THEAD>
                  <TBODY>
                    <TR>
                      <TH>
                        <span className="max-sm:text-xs">Nominal value</span>
                      </TH>
                      <TD>
                        <p className="flex gap-0.5 items-center justify-center">
                          <CurrencyIcon className="h-2.5" />
                          {isINR ? "10L" : "100K"}
                        </p>
                      </TD>
                      <TD>
                        <span className="flex gap-1 items-start leading-none justify-center">
                          <p className="flex gap-0.5 items-center justify-center">
                            <CurrencyIcon className="h-2.5" />
                            {isINR ? "18.9L" : "189K"}
                          </p>
                          <span className="text-primary text-xs font-semibold">
                            +89%
                          </span>
                        </span>
                      </TD>
                    </TR>
                    <TR>
                      <TH>
                        <span className="max-sm:text-xs">
                          Inflation-Adjusted
                        </span>
                      </TH>
                      <TD>
                        <p className="flex gap-0.5 items-center justify-center">
                          <CurrencyIcon className="h-2.5" />
                          {isINR ? "5.74L" : "574K"}
                        </p>
                      </TD>
                      <TD>
                        <span className="flex gap-1 items-start leading-none justify-center">
                          <p className="flex gap-0.5 items-center justify-center">
                            <CurrencyIcon className="h-2.5" />
                            {isINR ? "10.45L" : "1.04M"}
                          </p>
                          <span className="text-primary text-xs font-semibold">
                            +82%
                          </span>
                        </span>
                      </TD>
                    </TR>
                  </TBODY>
                </table>
              </div>
              <p className="mt-3">
                As you see, your money maintains its purchasing power. After 10
                years, you can buy a car equivalent to today's {currency}{" "}
                {isINR ? "10L" : "100K"} model, NOT one worth {currency}{" "}
                {isINR ? "18.9L" : "189K"} today. Without investing, that same{" "}
                {currency} {isINR ? "10L" : "100K"} would shrink to {currency}{" "}
                {currency} {isINR ? "5.74L" : "574K"}.
              </p>
              <p className="mt-2">
                Inflation-adjusted value is included not to demotivate you, but
                to set realistic expectations — because smart investing is about
                growing wealth after beating inflation.
              </p>
            </>
          }
        />
        {/* Accordion 2 */}
        <Accordion
          title="Why invest if inflation eats into returns?"
          content={
            <>
              <p className="mb-2">
                Because not investing is a guaranteed loss!
              </p>
              <p className="mb-2">Compare:</p>
              <ul className="list-disc ps-8">
                <li className="mb-1">
                  Invest {currency} {isINR ? "10L" : "100K"} (6% return, 6%
                  inflation):
                  <br />
                  Future value: {currency} {isINR ? "18.19L" : "1.81M"} → Real
                  value: {currency} {isINR ? "10.45L" : "1.04M"} (today's
                  money).
                </li>
                <li>
                  Don't invest:
                  <br />
                  Future value: {currency} {isINR ? "10L" : "100K"} → Real
                  value: {currency} {isINR ? "5.74L" : "574K"} (money rots due
                  to inflation).
                </li>
              </ul>
              <p className="mt-3">
                Investing preserves your wealth; doing nothing halves it.
              </p>
            </>
          }
        />
        {/* Accordion 3 */}
        <Accordion
          title="How are the values determined?"
          content={
            <>
              <a
                href={calculationsImagePNG}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={calculationsImage}
                  alt="equations used for calculating the result values"
                  loading="lazy"
                  className="block max-sm:w-full aspect-[605/225]"
                />
              </a>
            </>
          }
        />
        {/* Accordion 4 */}
        <Accordion
          title="Can investing really make my future better?"
          content={
            <>
              <p className="mb-2">
                Yes, it can! Investing is like planting a seed that grows over
                time. The earlier you start, the more your money can build up,
                thanks to something called compound growth—where your earnings
                make more earnings. It’s not a quick fix, but it can give you
                money for retirement, emergencies, or even to pass on to your
                family. Waiting too long makes it harder to get ahead.
              </p>
            </>
          }
        />
      </div>
    </Card>
  );
};

export default FAQCard;
