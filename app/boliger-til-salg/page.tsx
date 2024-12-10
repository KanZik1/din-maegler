'use client'

import { useEffect, useState } from 'react'
import Boligertilsalg from '@/components/Boligertilsalg'

export default function BoligerTilSalgPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <Boligertilsalg />
} 