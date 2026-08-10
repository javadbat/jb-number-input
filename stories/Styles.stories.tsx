import type { Meta, StoryObj } from "@storybook/react-vite";
import { JBNumberInput } from "jb-number-input/react";
import "../../../docs/styles/ant-design.css";
import "../../../docs/styles/aurora.css";
import "../../../docs/styles/bootstrap.css";
import "../../../docs/styles/candy.css";
import "../../../docs/styles/carbon.css";
import "../../../docs/styles/cupertino.css";
import "../../../docs/styles/fluent.css";
import "../../../docs/styles/forest.css";
import "../../../docs/styles/material.css";
import "../../../docs/styles/porcelain.css";
import "../../../docs/styles/sunset.css";
import "../../../docs/styles/terminal.css";
import "../../jb-input/stories/styles/style-ant-design.css";
import "../../jb-input/stories/styles/style-aurora.css";
import "../../jb-input/stories/styles/style-bootstrap.css";
import "../../jb-input/stories/styles/style-candy.css";
import "../../jb-input/stories/styles/style-carbon.css";
import "../../jb-input/stories/styles/style-cupertino.css";
import "../../jb-input/stories/styles/style-fluent.css";
import "../../jb-input/stories/styles/style-forest.css";
import "../../jb-input/stories/styles/style-material.css";
import "../../jb-input/stories/styles/style-porcelain.css";
import "../../jb-input/stories/styles/style-sunset.css";
import "../../jb-input/stories/styles/style-terminal.css";
import "./styles/style-ant-design.css";
import "./styles/style-aurora.css";
import "./styles/style-bootstrap.css";
import "./styles/style-candy.css";
import "./styles/style-carbon.css";
import "./styles/style-cupertino.css";
import "./styles/style-fluent.css";
import "./styles/style-forest.css";
import "./styles/style-material.css";
import "./styles/style-porcelain.css";
import "./styles/style-sunset.css";
import "./styles/style-terminal.css";

const meta = {
  title: "Components/form elements/Inputs/JBNumberInput/Style",
  component: JBNumberInput,
} satisfies Meta<typeof JBNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const styleSamples = [
  { name: "Carbon", className: "carbon-style" },
  { name: "Aurora", className: "aurora-style" },
  { name: "Forest", className: "forest-style" },
  { name: "Sunset", className: "sunset-style" },
  { name: "Porcelain", className: "porcelain-style" },
  { name: "Candy", className: "candy-style" },
  { name: "Terminal", className: "terminal-style" },
  { name: "Material", className: "material-style" },
  { name: "Fluent", className: "fluent-style" },
  { name: "Bootstrap", className: "bootstrap-style" },
  { name: "Cupertino", className: "cupertino-style" },
  { name: "Ant Design", className: "ant-design-style" },
];

function NumberInputStyleSample({ className }: { className: string }) {
  return (
    <div style={{ display: "grid", gap: "0.75rem", minWidth: 0, maxWidth: "100%", width: "100%" }}>
      <JBNumberInput className={className} label="Amount" value={1250000.5} message="Formatted with a thousands separator" showThousandSeparator decimalPrecision={2} />
      <JBNumberInput className={className} label="Quantity" value={12} message="Adjust in steps of two" showControlButton step={2} minValue={0} maxValue={100} />
      <JBNumberInput className={className} label="Validation error" value={-25} error="The amount must be positive" />
      <JBNumberInput className={className} label="Disabled amount" value={2400} showThousandSeparator disabled />
    </div>
  );
}

export const Gallery: Story = {
  name: "Gallery",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(21rem, 1fr))", gap: "1.25rem", alignItems: "start", width: "min(100%, 82rem)" }}>
      {styleSamples.map(sample => (
        <section
          key={sample.className}
          className={sample.className}
          style={{
            display: "grid",
            gap: "0.75rem",
            minWidth: 0,
            padding: "1rem",
            background: "var(--jb-surface, #ffffff)",
            border: "1px solid var(--jb-border-color, #e5e7eb)",
            borderRadius: "0.75rem",
            boxShadow: "0 0.75rem 1.75rem oklch(0% 0 0 / 0.08)",
          }}
        >
          <div style={{ width: "100%", color: "var(--jb-content-primary, #334155)", fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.4, textAlign: "center" }}>{sample.name}</div>
          <NumberInputStyleSample className={sample.className} />
        </section>
      ))}
    </div>
  ),
};

export const Default: Story = { name: "Default", render: () => <NumberInputStyleSample className="" /> };
export const Carbon: Story = { name: "Carbon", render: () => <NumberInputStyleSample className="carbon-style" /> };
export const Aurora: Story = { name: "Aurora", render: () => <NumberInputStyleSample className="aurora-style" /> };
export const Forest: Story = { name: "Forest", render: () => <NumberInputStyleSample className="forest-style" /> };
export const Sunset: Story = { name: "Sunset", render: () => <NumberInputStyleSample className="sunset-style" /> };
export const Porcelain: Story = { name: "Porcelain", render: () => <NumberInputStyleSample className="porcelain-style" /> };
export const Candy: Story = { name: "Candy", render: () => <NumberInputStyleSample className="candy-style" /> };
export const Terminal: Story = { name: "Terminal", render: () => <NumberInputStyleSample className="terminal-style" /> };
export const Material: Story = { name: "Material", render: () => <NumberInputStyleSample className="material-style" /> };
export const Fluent: Story = { name: "Fluent", render: () => <NumberInputStyleSample className="fluent-style" /> };
export const Bootstrap: Story = { name: "Bootstrap", render: () => <NumberInputStyleSample className="bootstrap-style" /> };
export const Cupertino: Story = { name: "Cupertino", render: () => <NumberInputStyleSample className="cupertino-style" /> };
export const AntDesign: Story = { name: "Ant Design", render: () => <NumberInputStyleSample className="ant-design-style" /> };
