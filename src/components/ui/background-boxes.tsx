'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(48).fill(1);
  const cols = new Array(30).fill(1);
  return (
    <div
      style={{
        transform: `translate(20%,-20%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        'absolute -top-1/4 left-1/4 -mt-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2',
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-secondary-foreground/15"
        >
          {cols.map((_, j) => (
            <motion.div
              style={{
                backgroundColor: `color-mix(in oklab, var(--foreground) 0%, transparent)`,
              }}
              whileHover={{
                backgroundColor: `color-mix(in oklab, var(--foreground) 50%, transparent)`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-secondary-foreground/15"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute top-[-14px] left-[-22px] h-6 w-10 stroke-[1px] text-secondary-foreground/15"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
