import Navigation from '@/components/navigation';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <React.Fragment>
      <Helmet>
        <title>pusu</title>
        <meta name="description" content="Simple type-safe pub-sub implementation APIs for Javascript/TypeScript Apps" />
        <meta name="keywords" content="pub-sub, publish, subscribe" />
      </Helmet>
      <div className="flex flex-row">
        <Navigation />
        <div className="p-4 flex-1" style={{ height: '100vh', overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </React.Fragment>
  )
}
