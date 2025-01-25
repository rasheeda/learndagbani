// src/app/page.tsx
import { Hero } from '@/components/home/hero'
import { Features } from '@/components/home/features'
import { ContentBlocks } from '@/components/home/content-blocks'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ContentBlocks />
    </>
  )
}