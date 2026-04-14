declare module "react-simple-maps" {
  import { ComponentType, SVGProps, MouseEvent, ReactNode } from "react";

  export interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    onMoveStart?: (data: { coordinates: [number, number]; zoom: number }) => void;
    onMove?: (data: { x: number; y: number; zoom: number }) => void;
    onMoveEnd?: (data: { coordinates: [number, number]; zoom: number }) => void;
    translateExtent?: [[number, number], [number, number]];
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: Geography[] }) => ReactNode;
  }

  export interface Geography {
    rsmKey: string;
    id: string;
    type: string;
    properties: Record<string, unknown>;
    geometry: object;
  }

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: Geography;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    className?: string;
    onClick?: (e: MouseEvent<SVGPathElement>) => void;
    onMouseEnter?: (e: MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (e: MouseEvent<SVGPathElement>) => void;
    onMouseMove?: (e: MouseEvent<SVGPathElement>) => void;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    onClick?: (e: MouseEvent<SVGGElement>) => void;
    onMouseEnter?: (e: MouseEvent<SVGGElement>) => void;
    onMouseLeave?: (e: MouseEvent<SVGGElement>) => void;
    onMouseMove?: (e: MouseEvent<SVGGElement>) => void;
    className?: string;
    style?: React.CSSProperties;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
}
