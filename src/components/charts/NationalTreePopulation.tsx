import { ChartFrame, buildAriaSummary } from "./ChartFrame";

const STATES = [
  { name: "Assam", lakh: 1143.7, share: "82.38" },
  { name: "Tripura", lakh: 151.5, share: "10.81" },
  { name: "Manipur", lakh: 32, share: "2.29" },
  { name: "Karnataka", lakh: 24, share: "1.71" },
  { name: "Nagaland", lakh: 23, share: "1.64" },
  { name: "Andhra Pradesh", lakh: 10, share: "<1" },
  { name: "Kerala", lakh: 10, share: "<1" },
  { name: "Maharashtra", lakh: 3, share: "<1" },
  { name: "Meghalaya", lakh: 1.72, share: "<1" },
  { name: "Arunachal Pradesh", lakh: 0.25, share: "<1" },
  { name: "Telangana", lakh: 0.20, share: "<1" },
  { name: "Mizoram", lakh: 0.10, share: "<1" },
  { name: "Tamil Nadu", lakh: 0.10, share: "<1" },
  { name: "West Bengal", lakh: 0.06, share: "<1" },
  { name: "Others", lakh: 0.03, share: "<1" },
];
const SOURCE = {
  publication: "MoEF&CC-commissioned NDF study (Botanical Survey of India)",
  date: "February 2024",
  provenanceLabel: "Client-verified NDF study",
};
const ariaLabel = buildAriaSummary(
  "NDF estimate of cultivated agar tree population by state, in lakh",
  STATES.map((state) => ({ label: state.name, value: `${state.lakh} lakh` })),
);

export function NationalTreePopulation() {
  return (
    <ChartFrame
      title="Cultivated agar tree population by state"
      subtitle="Trees over 2 years old and over 10 cm girth at breast height (GBH). Population and percentage columns are reproduced as stated in the NDF summary."
      ariaLabel={ariaLabel}
      source={SOURCE}
      note="The total is printed as 1,398.9 lakh (139.89 million; 13.989 crore) in the client document. Figures and shares are presented as published and confirmed for use by the client's organization."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-cream/70">
            <tr><th className="p-2">State</th><th className="p-2">Estimated trees (lakh)</th><th className="p-2">Share stated</th></tr>
          </thead>
          <tbody>
            {STATES.map((state) => (
              <tr key={state.name} className="border-t border-white/10">
                <th scope="row" className="p-2 font-medium text-cream">{state.name}</th>
                <td className="p-2 text-cream/85">{state.lakh}</td>
                <td className="p-2 text-cream/85">{state.share}{state.share !== "<1" ? "%" : ""}</td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr className="border-t border-white/20 font-semibold"><th className="p-2 text-gold-light">Total (as printed)</th><td className="p-2 text-gold-light" colSpan={2}>1,398.9 lakh · 139.89 million · 13.989 crore</td></tr></tfoot>
        </table>
      </div>
    </ChartFrame>
  );
}
