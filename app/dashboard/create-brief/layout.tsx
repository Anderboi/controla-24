import React from 'react'

const LayoutPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="min-h-[70svh] max-h-[90svh] sm:max-h-[75svh] relative mx-2 flex h-full overflow-clip rounded-lg bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:m-auto sm:w-full sm:max-w-[900px] sm:flex-col sm:p-6">
      {children}
    </section>
  );
};

export default LayoutPage