"use client";

import * as React from "react";
import { Star, CheckCircle, XCircle, Search, MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const reviews = [
  {
    id: 1,
    author: "Fatima R.",
    product: "Classic Silk Hijab",
    rating: 5,
    date: "2026-07-20",
    comment: "Absolutely love the quality of this silk! It feels so premium and doesn't slip when using magnetic pins. Totally recommend it.",
    status: "Approved",
    avatar: "/avatars/01.png"
  },
  {
    id: 2,
    author: "Aisha T.",
    product: "Premium Cotton Underscarf",
    rating: 4,
    date: "2026-07-19",
    comment: "Very breathable material, perfect for summer. Taking one star off because I wish there were more color options available.",
    status: "Pending",
    avatar: "/avatars/02.png"
  },
  {
    id: 3,
    author: "Zainab M.",
    product: "Luxury Chiffon Scarf - Evening Wear",
    rating: 5,
    date: "2026-07-18",
    comment: "Stunning! Wore this to a wedding and got so many compliments. The drape is just perfect.",
    status: "Approved",
    avatar: "/avatars/03.png"
  },
  {
    id: 4,
    author: "User_8472",
    product: "Magnetic Hijab Pins Set",
    rating: 1,
    date: "2026-07-15",
    comment: "spam link www.buy-cheap-followers.com !!",
    status: "Rejected",
    avatar: ""
  }
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage customer feedback and product ratings.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-2">
        <div className="flex border rounded-md px-3 py-1 items-center bg-background w-full md:w-[400px]">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <Input 
            placeholder="Search reviews by content or author..." 
            className="border-0 shadow-none focus-visible:ring-0 px-0 h-9"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="h-10 w-full md:w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <div className="p-0 flex flex-col sm:flex-row">
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm">{review.author}</h4>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {review.status === "Pending" && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>}
                    {review.status === "Approved" && <Badge className="bg-green-100 text-green-700">Published</Badge>}
                    {review.status === "Rejected" && <Badge variant="destructive" className="bg-red-100 text-red-700">Spam/Rejected</Badge>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={review.rating} />
                    <span className="text-xs font-medium text-muted-foreground">on {review.product}</span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              </div>
              
              <div className="bg-muted/30 border-t sm:border-t-0 sm:border-l p-4 sm:w-48 flex flex-row sm:flex-col justify-center sm:justify-start gap-2 items-center sm:items-stretch">
                <Button variant="outline" size="sm" className="w-full gap-2 justify-start text-green-600 hover:text-green-700 hover:bg-green-50">
                  <CheckCircle className="h-4 w-4" /> Approve
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-2 justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                  <XCircle className="h-4 w-4" /> Reject
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
                  <MessageSquare className="h-4 w-4" /> Reply
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
