'use client'
import useFetch from '@/hooks/useFetch'
import { deleteRecommendation } from '@/services'

export default function RecommendationActions({ id }: { id: string }) {
  const { send } = useFetch(deleteRecommendation)

  return (
    <div className="absolute right-2">
      <button
        className="text-red-900"
        onClick={() => {
          send({ type: 'FETCH', payload: id })
        }}
      >
        delete
      </button>
    </div>
  )
}
