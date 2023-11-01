import { AutocompleteResponse } from "@/lib/types"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")
  if (!query) {
    return new NextResponse("Missing query", { status: 400 })
  }
  const uriQuery = encodeURIComponent(query)

  const res = await axios.get(`https://unsplash.com/nautocomplete/${uriQuery}`)

  const auto: AutocompleteResponse = res.data

  return new NextResponse(JSON.stringify(auto), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
