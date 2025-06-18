#!/bin/sh
branch=$(git branch --show-current)

# Bloqueia commits na main ou master
if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
  echo "🚫 ERRO: Commits diretos na branch '$branch' são bloqueados."
  echo "Use um branch de feature e abra um Pull Request!"
  echo "Para mais informações, consulte o guia de contribuição em ./docs/CONTRIBUTING.md"
  exit 1
fi
