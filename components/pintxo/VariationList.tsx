import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { VariationCard } from "./VariationCard";
import { Locale } from "../../types/common";
import { Pintxo, PintxoVariation } from "../../types/pintxo";

interface VariationListProps {
  variations: PintxoVariation[];
  pintxo: Pintxo;
  currentLocale: Locale;
  className?: string;
}

export const VariationList: React.FC<VariationListProps> = ({
  variations,
  pintxo,
  currentLocale,
  className = "",
}) => {
  const { t } = useTranslation("common");

  if (variations.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900">
          {t("pintxos.otherVariations")}
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {variations.map((variation) => (
            <VariationCard
              key={variation.id}
              variation={variation}
              pintxo={pintxo}
              currentLocale={currentLocale}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
