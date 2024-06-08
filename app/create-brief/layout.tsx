import React from 'react'

const LayoutPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <section className='px-2 py-4'>{children}</section>;
};

export default LayoutPage