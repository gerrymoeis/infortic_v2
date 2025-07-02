"use client"

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Category } from '@/types/category'

interface FilterDialogProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (selected: string[]) => void;
}

export function FilterDialog({ categories, selectedCategories, onCategoryChange }: FilterDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryToggle = (slug: string) => {
    const newSelected = selectedCategories.includes(slug)
      ? selectedCategories.filter(s => s !== slug)
      : [...selectedCategories, slug];
    onCategoryChange(newSelected);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter Kategori
          {selectedCategories.length > 0 && (
            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {selectedCategories.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Kategori</DialogTitle>
          <DialogDescription>
            Pilih satu atau lebih kategori untuk menyaring lomba.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.slug}
                  checked={selectedCategories.includes(category.slug)}
                  onCheckedChange={() => handleCategoryToggle(category.slug)}
                />
                <label
                  htmlFor={category.slug}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onCategoryChange([])} disabled={selectedCategories.length === 0}>
            Reset
          </Button>
          <Button onClick={() => setIsOpen(false)}>Selesai</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
