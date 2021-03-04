#!/bin/bash

# Read package name from stdin
read -r -p "Package name: " package_name

# Read component name from stdin
read -r -p "Component name: " component_dir

cd "./${package_name}/src/components";

# Create the component folder
mkdir -p $component_dir
cd $component_dir

# Get the name of the component by splitting component dir by '/' and grabbing the last element
component_name=$(echo ${component_dir} | grep -oE "[^/]+$")

# Create all the files inside component dir
indexFile='index.ts'
viewFile="${component_name}.view.tsx"
containerFile="${component_name}.container.tsx"
typesFile="${component_name}.types.ts"
touch "${indexFile}"
touch "${viewFile}"
touch "${containerFile}"
touch "${typesFile}"

# Add view template
echo "import React from 'react';
import { ${component_name}ViewComponent } from './${component_name}.types';

export const ${component_name}View: ${component_name}ViewComponent = () => <></>;

" > $viewFile

# Add container template
echo "import React from 'react';
import { ${component_name}ContainerComponent } from './${component_name}.types';

export const ${component_name}Container: ${component_name}ContainerComponent = () => <></>;

" > $containerFile

# Add types template
echo "type ${component_name}ViewProps = {};
type ${component_name}ContainerProps = {};

export type ${component_name}ViewComponent = React.FC<${component_name}ViewProps>;
export type ${component_name}ContainerComponent = React.FC<${component_name}ContainerProps>;

" > $typesFile

# Add index template
echo "export { ${component_name}Container as ${component_name} } from './${component_name}.container';" > $indexFile
