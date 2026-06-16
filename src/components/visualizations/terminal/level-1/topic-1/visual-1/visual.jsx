import React, { useState, useMemo } from 'react';
import './visual.css';

const COMMANDS = [
  {
    name: 'ls',
    syntax: 'ls [options] [path]',
    description: 'List directory contents. Shows files and folders in the current or specified directory.',
    example: '$ ls -la /home/user',
    output: 'total 48\ndrwxr-xr-x  6 user user 4096 Jun 10 09:12 .\ndrwxr-xr-x 18 root root 4096 Jun  9 18:30 ..\n-rw-r--r--  1 user user  220 Jun  9 18:30 .bash_logout\n-rw-r--r--  1 user user 3526 Jun  9 18:30 .bashrc\ndrwxr-xr-x  2 user user 4096 Jun 10 09:12 projects',
  },
  {
    name: 'cd',
    syntax: 'cd [directory]',
    description: 'Change directory. Navigate into a folder. Use `cd ..` to go up one level, `cd ~` for home.',
    example: '$ cd projects/my-app',
    output: '# No output on success — prompt changes to new path',
  },
  {
    name: 'pwd',
    syntax: 'pwd',
    description: 'Print Working Directory. Shows the full path of the directory you are currently in.',
    example: '$ pwd',
    output: '/home/user/projects/my-app',
  },
  {
    name: 'mkdir',
    syntax: 'mkdir [-p] directory',
    description: 'Make directory. Creates a new folder. Use -p to create nested directories in one command.',
    example: '$ mkdir -p src/components/ui',
    output: '# Directories created silently',
  },
  {
    name: 'rm',
    syntax: 'rm [-rf] file/dir',
    description: 'Remove files or directories. -r is recursive (for folders), -f forces without confirmation. Use carefully!',
    example: '$ rm -rf node_modules',
    output: '# Deletes node_modules and all contents',
  },
  {
    name: 'cat',
    syntax: 'cat [file]',
    description: 'Concatenate and display file contents. Great for quickly reading small files without opening an editor.',
    example: '$ cat package.json',
    output: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js"\n  }\n}',
  },
  {
    name: 'grep',
    syntax: 'grep [pattern] [file]',
    description: 'Search for patterns in files. Use -r for recursive search through directories, -n to show line numbers.',
    example: '$ grep -rn "useState" src/',
    output: 'src/App.jsx:2:import { useState } from \'react\';\nsrc/components/Counter.jsx:4:  const [count, setCount] = useState(0);',
  },
  {
    name: 'echo',
    syntax: 'echo [text]',
    description: 'Print text to terminal. Useful for debugging, displaying variable values, or writing text to files with >>.',
    example: '$ echo "Hello World" >> log.txt',
    output: '# Appends "Hello World" to log.txt',
  },
  {
    name: 'mv',
    syntax: 'mv [source] [dest]',
    description: 'Move or rename files and directories. Moving to the same directory with a new name renames the file.',
    example: '$ mv old-name.js new-name.js',
    output: '# File renamed silently',
  },
  {
    name: 'cp',
    syntax: 'cp [-r] [source] [dest]',
    description: 'Copy files or directories. Use -r to copy entire directories recursively.',
    example: '$ cp -r src/ backup/src/',
    output: '# Copies entire src directory to backup/src/',
  },
  {
    name: 'chmod',
    syntax: 'chmod [mode] [file]',
    description: 'Change file permissions. Common: 755 for executables, 644 for regular files, +x to make a script runnable.',
    example: '$ chmod +x deploy.sh',
    output: '# deploy.sh is now executable',
  },
  {
    name: 'man',
    syntax: 'man [command]',
    description: 'Manual pages. Opens full documentation for any command. Press q to quit, / to search inside.',
    example: '$ man grep',
    output: 'GREP(1)           General Commands Manual          GREP(1)\n\nNAME\n     grep — file pattern searcher\n\nSYNOPSIS\n     grep [-abcDEFGHhIiJLlmnOopqRSsUVvwxZ] [-A num] ...',
  },
];

export default function TermBasicsVisualization() {
  const [activeCmd, setActiveCmd] = useState(null);

  const selected = useMemo(
    () => COMMANDS.find((c) => c.name === activeCmd) || null,
    [activeCmd]
  );

  return (
    <div className="termbasics-root">
      <div className="termbasics-header">
        <span className="termbasics-dot termbasics-dot-red" />
        <span className="termbasics-dot termbasics-dot-yellow" />
        <span className="termbasics-dot termbasics-dot-green" />
        <span className="termbasics-title">bash — terminal command explorer</span>
      </div>

      <div className="termbasics-prompt-row">
        <span className="termbasics-prompt-user">user@devora</span>
        <span className="termbasics-prompt-sep">:</span>
        <span className="termbasics-prompt-path">~</span>
        <span className="termbasics-prompt-dollar">$</span>
        <span className="termbasics-cursor" />
      </div>

      <p className="termbasics-hint">Click a command to explore it</p>

      <div className="termbasics-grid">
        {COMMANDS.map((cmd) => (
          <button
            key={cmd.name}
            className={
              'termbasics-cmd-btn' +
              (activeCmd === cmd.name ? ' termbasics-cmd-btn--active' : '')
            }
            onClick={() => setActiveCmd(activeCmd === cmd.name ? null : cmd.name)}
          >
            {cmd.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="termbasics-detail">
          <div className="termbasics-detail-header">
            <span className="termbasics-detail-name">{selected.name}</span>
            <span className="termbasics-detail-syntax">{selected.syntax}</span>
          </div>
          <p className="termbasics-detail-desc">{selected.description}</p>
          <div className="termbasics-code-block">
            <div className="termbasics-code-label">Example</div>
            <pre className="termbasics-pre">
              <code className="termbasics-example-line">{selected.example}</code>
              {'\n'}
              <code className="termbasics-output-line">{selected.output}</code>
            </pre>
          </div>
        </div>
      )}

      {!selected && (
        <div className="termbasics-placeholder">
          <span className="termbasics-placeholder-icon">↑</span>
          <span>Select a command above to see its syntax and usage</span>
        </div>
      )}
    </div>
  );
}
