import React from 'react';
import { Star } from 'lucide-react';
import { cn, getRatingColor } from '../../lib/utils';

interface RatingProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  showNumber = true,
  size = 'md',
  className
}) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starRating = index + 1;
    const isFilled = starRating <= Math.round(rating);
    const isHalfFilled = starRating - 0.5 <= rating && starRating > rating;

    return (
      <Star
        key={index}
        className={cn(
          sizes[size],
          isFilled || isHalfFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        )}
      />
    );
  });

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">{stars}</div>
      {showNumber && (
        <span className={cn('ml-1 text-sm font-medium', getRatingColor(rating))}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
