import ProjectsBar from "@/components/ProjectsBar";
import SiteNav from "@/components/SiteNav";

export default function SiteHeader() {
  return (
    <header>
      <ProjectsBar current="memory" />
      <SiteNav />
    </header>
  );
}
