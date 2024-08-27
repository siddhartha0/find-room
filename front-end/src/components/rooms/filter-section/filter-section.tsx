import { Button, InfoText, MediumInfoText } from "../../../units";
import { InputField } from "../../../units/input-field/input-field";
import React from "react";
import { AreaData } from "../../../constant";
import { Icon } from "@iconify/react";

export const FilterSection = React.memo(
  ({
    filterValue,
    setFilterValue,
    sliderValue,
    setSliderValue,
  }: {
    filterValue: string;
    setFilterValue: React.Dispatch<React.SetStateAction<string>>;
    sliderValue: number;
    setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    return (
      <main className="flex flex-col w-full  p-6 gap-6 rounded-md min-h-96 bg-[#FBFBFB]">
        <header className="flex place-items-center gap-4 ">
          <MediumInfoText title="Filter" />

          <Icon icon="mage:filter" fontSize={22} />
        </header>

        <section id="price-range" className="flex flex-col gap-3">
          <InfoText title="Select a price range" />
          <InfoText title={sliderValue.toString()} />
          <InputField
            inputType="range"
            inputValue={sliderValue}
            min={0}
            max={20000}
            onChange={(e) => setSliderValue(+e.target.value)}
          />
        </section>

        <section id="area" className="flex flex-col gap-3">
          <InfoText title="Select you suitable place" />
          <select
            name="role"
            className="bg-input-bg p-4 rounded-lg w-[100%] outline-none"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            {AreaData.map((area, i) => (
              <option value={area} key={i + area}>
                {area}
              </option>
            ))}
          </select>
        </section>

        <Button
          onClick={() => {
            setFilterValue("");
            setSliderValue(0);
          }}
        >
          Clear
        </Button>
      </main>
    );
  }
);
