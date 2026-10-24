import { ChartFrame, buildAriaSummary } from "./ChartFrame";
const SOURCE = { publication: "MoEF&CC-commissioned NDF study (Botanical Survey of India)", date: "February 2024", provenanceLabel: "Verified NDF study" };
const DATA = [{ label: "Global agarwood market estimate", value: "$32 billion" }, { label: "Projected market by 2029", value: "$64 billion" }];
const ariaLabel = buildAriaSummary("NDF-reported global agarwood market estimate and projection", DATA);
export function GlobalMarketGrowth() {
  return <ChartFrame title="Global agarwood market estimate and projection" subtitle="The NDF summary gives an estimated global agarwood market of US$32 billion and a projection of US$64 billion by the end of 2029." ariaLabel={ariaLabel} source={SOURCE} note="The source also states a 7.7% CAGR for agarwood chips during 2018–2022 and a 2023 valuation of US$44,050.7 million; it separately states a 7.1% CAGR and US$86,467.6 million endpoint with the year printed as 2023. These additional statements are reproduced as written in the findings below.">
    <div className="grid gap-5 sm:grid-cols-2">{DATA.map((item,index)=><div key={item.label} className="rounded-sm border border-white/15 p-5"><p className="text-xs uppercase tracking-wide text-cream/70">{item.label}</p><p className="mt-2 font-display text-3xl font-bold text-gold-light">{item.value}</p>{index===1&&<p className="mt-1 text-sm text-cream/70">2029 projection</p>}</div>)}</div>
  </ChartFrame>;
}
