import React from 'react'

const LayoutPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="dark:border-neutral-800 bg-white dark:bg-neutral-900 relative flex h-[calc(100%)] overflow-clip rounded-lg mx-2 p-4 sm:m-auto max-h-[90svh] sm:max-h-[75svh] sm:w-full sm:max-w-[900px] sm:flex-col sm:p-6">
      {children}
    </section>
  );
};

export default LayoutPage