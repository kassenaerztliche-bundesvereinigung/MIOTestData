# MIO Test Daten

## Einleitung

Dieses Repository enthält Test- und Beispieldaten für den [MIO Parser](https://github.com/kassenaerztliche-bundesvereinigung/MIOParser) und den [MIO Viewer](https://github.com/kassenaerztliche-bundesvereinigung/MIOViewer).


Die Beispiele sind für technische Tests gedacht und bilden keine vollständigen und medizinisch korrekten Inhalte ab. 
Vollständige und inhaltlich korrekte Beispiele sind auf [Simplifier- KBV Projekte](https://simplifier.net/organization/kassenrztlichebundesvereinigungkbv/~projects) zu finden.

In Beispielen, die nicht unter "errors" gelistet sind können auch Warnings auftreten.

## Struktur
```
data
└───bundles (komplette Dokumente, die so auch in der EPA auftauchen würden)
│   └───!performance (Dateien für Tests bezüglich der Leistungsfähigkeit) 
│   └───error (Allgemeine Fehlerdokumente)
│   └───IM 
│   └───MR
│   └───UH
│   └───... (Ordner für jedes MIO)
│        └─── error (Fehlerdokumente für das spezifische MIO) 
│       │   example.json
│       │   ...
│   
└───profiles
    │   └───IM 
    │   └───... (Ordner für jedes MIO)
    │       └─── error (Fehlerprofile für das spezifische MIO)
    │       | profileExample.json
    │       | ... 
```

## Setup

Code von GitHub runterladen oder klonen.

```shell script
$ git clone https://github.com/kassenaerztliche-bundesvereinigung/miotestdata.git
$ cd miotestdata
$ npm install
$ npm run build
$ npm link
```

## Mitwirken
Fehler in den Beispielen können über die [GitHub Issues](https://github.com/kassenaerztliche-bundesvereinigung/MIOTestData/issues) Seite gemeldet werden.
Über GitHub oder die Mail-Adresse support.mio@kbv.de können Fragen gestellt werden. 