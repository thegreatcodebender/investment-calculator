import Accordion from "./Accordion";
import Card from "./Card";
import { RupeeIcon } from "./Icons";
import { TBODY, TD, TH, THEAD, TR } from "./Table";

const FAQCard = () => {
  return (
    <Card className="max-lg:mt-8 min-w-[300px] mt-6">
      <h3 className="mb-0.5 text-lg font-semibold leading-snug">FAQs</h3>
      <div className="mt-3">
        {/* Accordion 1 */}
        <Accordion
          id="faq-1"
          title="What does 'Inflation-Adjusted' mean?"
          content={
            <>
              <p className="mb-2">
                This value tells you what your future investment is truly worth
                in today's purchasing power.
              </p>
              <p className="font-semibold mb-1">Example: </p>
              <p className="flex flex-wrap">
                Invest INR 10L today at 6% return for 10 years, and inflation
                rate is 5.7%. After 10 years:
              </p>
              <div className="overflow-x-auto no-scrollbar">
                <table className="mt-3 mx-auto border-collapse">
                  <THEAD>
                    <TR>
                      <TH haveBorder={false}>
                        <span className="sr-only">Value type</span>
                      </TH>
                      <TH>Without investment</TH>
                      <TH>With investment</TH>
                    </TR>
                  </THEAD>
                  <TBODY>
                    <TR>
                      <TH>Nominal value</TH>
                      <TD>
                        <p className="flex gap-0.5 items-center justify-center">
                          <RupeeIcon className="h-2.5" />
                          10L
                        </p>
                      </TD>
                      <TD>
                        <span className="flex gap-1 items-start leading-none justify-center">
                          <p className="flex gap-0.5 items-center justify-center">
                            <RupeeIcon className="h-2.5" />
                            18.9L
                          </p>
                          <span className="text-primary text-xs font-semibold">
                            +89%
                          </span>
                        </span>
                      </TD>
                    </TR>
                    <TR>
                      <TH>Inflation-Adjusted</TH>
                      <TD>
                        <p className="flex gap-0.5 items-center justify-center">
                          <RupeeIcon className="h-2.5" />
                          5.74L
                        </p>
                      </TD>
                      <TD>
                        <span className="flex gap-1 items-start leading-none justify-center">
                          <p className="flex gap-0.5 items-center justify-center">
                            <RupeeIcon className="h-2.5" />
                            10.45L
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
                years, you can buy a car equivalent to today's INR 10L model,
                NOT one worth INR 18.9L today. Without investing, that same INR
                10L would shrink to INR 5.74L.
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
          id="faq-2"
          title="Why invest if inflation eats into returns?"
          content={
            <>
              <p className="mb-2">
                Because not investing is a guaranteed loss!
              </p>
              <p className="mb-2">Compare:</p>
              <ul className="list-disc ps-8">
                <li className="mb-1">
                  Invest INR 10L (6% return, 6% inflation):
                  <br />
                  Future value: INR 18.19L → Real value: INR 10.45L (today's
                  money).
                </li>
                <li>
                  Don't invest:
                  <br />
                  Future value: INR 10L → Real value: INR 5.74L (money rots due
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
          id="faq-4"
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
