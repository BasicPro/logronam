import React from "react";
import { Euro, Star } from "lucide-react";

interface PriceRatingOverlayProps {
  price: number | { min: number; max: number };
  rating: number | { min: number; max: number };
  showPrice?: boolean;
  showRating?: boolean;
  pricePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  ratingPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PriceRatingOverlay: React.FC<PriceRatingOverlayProps> = ({
  price,
  rating,
  showPrice = true,
  showRating = true,
  pricePosition = "top-right",
  ratingPosition = "top-left",
  size = "md",
  className = "",
}) => {
  const getPositionClasses = (position: string) => {
    switch (position) {
      case "top-left":
        return "top-2 left-2";
      case "top-right":
        return "top-2 right-2";
      case "bottom-left":
        return "bottom-2 left-2";
      case "bottom-right":
        return "bottom-2 right-2";
      default:
        return "top-2 right-2";
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return {
          container: "px-2 py-1",
          icon: "w-3 h-3",
          text: "text-xs",
          gap: "gap-1",
        };
      case "md":
        return {
          container: "px-3 py-2",
          icon: "w-4 h-4",
          text: "text-lg",
          gap: "gap-2",
        };
      case "lg":
        return {
          container: "px-4 py-3",
          icon: "w-5 h-5",
          text: "text-xl",
          gap: "gap-3",
        };
      default:
        return {
          container: "px-3 py-2",
          icon: "w-4 h-4",
          text: "text-lg",
          gap: "gap-2",
        };
    }
  };

  const formatPrice = (price: number | { min: number; max: number }) => {
    if (typeof price === "number") {
      return `${price.toFixed(2)}`;
    } else {
      if (price.min === price.max) {
        return `${price.min.toFixed(2)}`;
      } else {
        return `${price.min.toFixed(2)} - ${price.max.toFixed(2)}`;
      }
    }
  };

  const formatRating = (rating: number | { min: number; max: number }) => {
    if (typeof rating === "number") {
      return rating.toFixed(1);
    } else {
      if (rating.min === rating.max) {
        return rating.min.toFixed(1);
      } else {
        return `${rating.min.toFixed(1)} - ${rating.max.toFixed(1)}`;
      }
    }
  };

  const sizeClasses = getSizeClasses(size);

  return (
    <>
      {showPrice && (
        <div
          className={`absolute ${getPositionClasses(
            pricePosition
          )} bg-white/90 backdrop-blur-sm rounded-full ${
            sizeClasses.container
          } flex items-center ${sizeClasses.gap} ${className}`}
        >
          <Euro className={`${sizeClasses.icon} text-green-600`} />
          <span className={`${sizeClasses.text} font-semibold text-green-600`}>
            {formatPrice(price)}
          </span>
        </div>
      )}

      {showRating && (
        <div
          className={`absolute ${getPositionClasses(
            ratingPosition
          )} bg-white/90 backdrop-blur-sm rounded-full ${
            sizeClasses.container
          } flex items-center ${sizeClasses.gap} ${className}`}
        >
          <Star className={`${sizeClasses.icon} text-yellow-500`} />
          <span className={`${sizeClasses.text} font-semibold text-yellow-600`}>
            {formatRating(rating)}
          </span>
        </div>
      )}
    </>
  );
};
