type ArtifactViewerProps = {
  content: string;
};

export default function ArtifactViewer({ content }: ArtifactViewerProps) {
  return (
    <aside className="h-full overflow-y-auto rounded-xl border border-slate-800 p-6">
      <h2 className="mb-4 text-xl font-bold">Artifact Viewer</h2>

      <div className="whitespace-pre-wrap text-slate-300">
        {content ||
          "Generated Markdown, Ship 30 essays, and HTML/CSS artifacts will appear here."}
      </div>
    </aside>
  );
}