"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThemePage() {
  const [primaryColor, setPrimaryColor] = useState("#3b82f6")
  const [secondaryColor, setSecondaryColor] = useState("#10b981")
  const [accentColor, setAccentColor] = useState("#f59e0b")

  const handleSave = () => {
    // In a real application, you would save these colors to your database
    // and update your application's theme
    console.log("Saving colors:", { primaryColor, secondaryColor, accentColor })
    alert("Theme colors saved!")
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Theme Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <Input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <Input
                id="secondaryColor"
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="accentColor">Accent Color</Label>
              <Input
                id="accentColor"
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Theme</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <div className="w-20 h-20 rounded" style={{ backgroundColor: primaryColor }}></div>
              <div className="w-20 h-20 rounded" style={{ backgroundColor: secondaryColor }}></div>
              <div className="w-20 h-20 rounded" style={{ backgroundColor: accentColor }}></div>
            </div>
            <p>Primary Color: {primaryColor}</p>
            <p>Secondary Color: {secondaryColor}</p>
            <p>Accent Color: {accentColor}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

