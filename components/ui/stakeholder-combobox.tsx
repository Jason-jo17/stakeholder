
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface Option {
    value: string
    label: string
    role?: string
}

interface StakeholderComboboxProps {
    value?: string
    onChange: (value: string) => void
    options: Option[]
}

export function StakeholderCombobox({ value, onChange, options = [] }: StakeholderComboboxProps) {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
              <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
              >
                  {value
                      ? options.find((framework) => framework.value === value)?.label
                      : "Select stakeholder..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
              <Command>
                  <CommandInput placeholder="Search stakeholder..." />
                  <CommandList>
                      <CommandEmpty>No stakeholder found.</CommandEmpty>
                      <CommandGroup>
                          {options.map((framework) => (
                              <CommandItem
                                  key={framework.value}
                                  value={framework.label} // Command matches on label usually
                                  onSelect={(currentValue) => {
                                      onChange(framework.value)
                                      setOpen(false)
                                  }}
                              >
                                  <Check
                                      className={cn(
                                          "mr-2 h-4 w-4",
                                          value === framework.value ? "opacity-100" : "opacity-0"
                                      )}
                                  />
                                  <div className="flex flex-col">
                                      <span>{framework.label}</span>
                                      {framework.role && <span className="text-xs text-muted-foreground">{framework.role}</span>}
                                  </div>
                              </CommandItem>
                          ))}
                      </CommandGroup>
                  </CommandList>
              </Command>
          </PopoverContent>
      </Popover>
  )
}
