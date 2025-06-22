"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { ExternalLink, FileCode, Github, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";
export default function Home() {
  const isMobile = useIsMobile()
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      <div className="max-w-6xl mx-auto flex w-full flex-col min-h-screen ">
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
          <h1 className="scroll-m-20 text-center text-7xl font-extrabold tracking-tight">
            James Mowat
          </h1>
          <p className="mt-2 text-center text-xl text-muted-foreground">
            Full-stack developer specializing in Go, TypeScript, React, Python, and more.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              onClick={() => {
                window.open("https://github.com/jfmow", "_blank")
              }}
              className="min-w-[150px]">
              <Github />
              Github
            </Button>
            <Button
              onClick={() => {
                window.scrollTo({ top: document.getElementById("projects")?.offsetTop || 0, behavior: "smooth" })
              }}
              className="min-w-[150px]"
              variant={"secondary"}>
              <FileCode />
              Projects
            </Button>
          </div>
        </div>
        <div id="projects" className="p-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Recent Projects</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projects.map((project) => (
              <Sheet
                key={project.id}>
                <SheetTrigger asChild>
                  <Card
                    className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={project.images[0] || "/placeholder.svg"}
                          alt={project.title}
                          width={500}
                          height={300}
                          className="w-full h-48 object-contain transition-transform duration-300"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="mb-2">{project.title}</CardTitle>
                      <CardDescription className="mb-4 text-sm">{project.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 bg-background text-foreground cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.githubUrl, "_blank")
                          }}
                        >
                          <Github className="w-3 h-3" />
                          Code
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.liveUrl, "_blank")
                          }}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Live Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </SheetTrigger>
                <SheetContent side={isMobile ? "bottom" : "right"} className={`${isMobile ? "max-h-[90vh] overflow-y-auto" : "max-h-screen"} flex flex-col p-2`}>
                  <SheetHeader>
                    <SheetTitle>
                      {project.title}
                    </SheetTitle>
                    <SheetDescription>
                      {project.description}
                    </SheetDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </SheetHeader>
                  {isMobile ? (
                    <Carousel>
                      <CarouselContent>
                        {project.images.map((image) => (
                          <CarouselItem key={image}>
                            <ImageDialog url={image} key={image}>
                              <div className="relative overflow-hidden rounded-lg border shadow m-2">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={project.title}
                                  width={500}
                                  height={300}
                                  className="w-full h-full max-h-[80vh] object-contain transition-transform duration-300"
                                />
                              </div>
                            </ImageDialog>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  ) : (
                    <div className="overflow-y-auto">
                      {project.images.map((image) => (
                        <ImageDialog url={image} key={image}>
                          <div className="relative overflow-hidden rounded-lg border shadow m-2">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={project.title}
                              width={500}
                              height={300}
                              className="w-full h-full max-h-[80vh] object-contain transition-transform duration-300"
                            />
                          </div>
                        </ImageDialog>
                      ))}
                    </div>
                  )}
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button>
                        <X />
                        Close
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </div>
      </div>
      <footer className="border-t bg-muted/50 p-4">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground mb-4">Built with Next.js, TypeScript, and Tailwind CSS</p>
          <p className="text-sm text-muted-foreground">© 2025 James Mowat. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

function ImageDialog({ url, children }: { url: string; children: ReactNode }) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-[95vw] max-h-[95vh] w-full h-full p-0 border-0 bg-black/95 backdrop-blur-sm">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTrigger>

          {/* Zoom controls */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsZoomed(!isZoomed)}
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            </Button>
          </div>

          {/* Image container */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={url || "/placeholder.svg"}
              alt="Product image preview"
              className={`max-w-full max-h-full object-contain transition-all duration-300 ease-in-out cursor-pointer ${isZoomed ? "scale-150" : "scale-100"
                }`}
              onClick={() => setIsZoomed(!isZoomed)}
              style={{
                filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5))",
              }}
            />
          </div>

          {/* Image info overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
              <p className="text-center">Click image to zoom • Press ESC to close</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  technologies: string[]
  liveUrl: string
  githubUrl: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Public Transport Tracker",
    description:
      "A full customizable dashboard for tracking public transport systems, including real-time updates. Using Go for the backend processing GTFS data to create a user-friendly interface which can be easily extended for any transport system.",
    images: ["/pictures/trains/trains.png", "/pictures/trains/trains-2.png", "/pictures/trains/trains-3.png"],
    technologies: ["Next.js", "TypeScript", "Tailwind", "Go", "GTFS", "SQLite"],
    liveUrl: "https://trains.suddsy.dev",
    githubUrl: "https://github.com/jfmow/gtfs-new-zealand",
  },
  {
    id: "2",
    title: "Rowlyze",
    description:
      "A rowing data analysis tool that allows users to upload their rowing data files, visualize their performance, and track progress over time. It features data sharing and support for multiple rowing data formats including Concept 2, RP3 and even NK SpeedCoach's.",
    images: ["/pictures/rowlyze/rowlyze.png", "/pictures/rowlyze/rowlyze-2.png", "/pictures/rowlyze/rowlyze-3.png", "/pictures/rowlyze/rowlyze-4.png", "/pictures/rowlyze/rowlyze-5.png"],
    technologies: ["Next.js", "Go", "TypeScript", "Pocketbase", "Chart.js", "Tailwind"],
    liveUrl: "https://rowlyze.com",
    githubUrl: "https://github.com/jfmow/rp3",
  },
  {
    id: "3",
    title: "Note",
    description: "A simple note-taking application that allows users to create, edit, and delete notes. It features a clean and intuitive interface with support for rich text formatting.",
    images: ["/pictures/noti/noti.png"],
    technologies: ["Next.js", "Go", "Pocketbase", "TypeScript", "Tailwind", "Editor.js"],
    liveUrl: "https://p.suddsy.dev",
    githubUrl: "https://github.com/jfmow/noti",
  },
]